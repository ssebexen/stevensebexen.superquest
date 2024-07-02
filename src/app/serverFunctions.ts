'use server'

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "./prisma";
import { Texture } from "~/components/texture";
import { validateTexture } from "~/components/texture";

export async function createUser(userName: string, firebaseToken: string) {
  try {
    await prisma.user.create({
      data: {
        userName,
        firebaseToken
      }
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return ({type: 'AlreadyExistsError', message: 'That username or token already exists.'});
    } else {
      return ({type: 'UnknownError', message: 'An unexpected error has occured.'});
    }
  }

  return {type: 'Success', message: ''};
}

export async function updateUserToken(userName: string, firebaseToken: string) {
  try {
    await prisma.user.upsert({
      where: {
        userName
      },
      create: {
        userName,
        firebaseToken
      },
      update: {
        firebaseToken
      }
    });
  } catch (e) {
    return ({type: 'UnknownError', message: 'An unexpected error has occured.'})
  }

  return ({type: 'Success', message: ''});
}

export async function createQuester(firebaseToken: string, texture: Texture) {
  if (!validateTexture(texture)) {
    return ({type: 'InvalidTextureError', message: 'Provided texture is invalid.'});
  }

  const user = await prisma.user.findUnique({
    where: {
      firebaseToken
    }
  });
  if (!user) {
    return ({type: 'AuthenticationRequired', message: 'Matching user token not found in database.'});
  }

  try {
    await prisma.quester.create({
      data: {
        name: 'Default',
        userId: user.id,
        textureData: JSON.stringify(texture)
      }
    });
  } catch (e) {
    console.error(e);
    return ({type: 'UnknownError', message: 'An unknown error has occurred.'});
  }

  return ({type: 'Success', message: 'Quester created successfully.'});
}

export async function getQuesters() {
  const result = await prisma.quester.findMany({take: 10});
  return result;
}
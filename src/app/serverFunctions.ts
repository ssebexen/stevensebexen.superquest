'use server'

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "./prisma";
import { Texture } from "~/utils/texture";
import { validateTexture } from "~/utils/texture";
import { getAuth } from "firebase-admin/auth";
import firebaseAdmin from "./firebaseAdmin";

export async function createUser(firebaseToken: string) {
  const user = await getAuth(firebaseAdmin).verifyIdToken(firebaseToken);
  if (!user.email) {
    return {type: 'NoEmailError', message: 'user.email is undefined.'};
  }
  try {
    await prisma.user.create({
      data: {
        userName: user.email
      }
    });
    return {type: 'Success', message: 'User created successfully.'};
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e);
      return ({type: 'AlreadyExistsError', message: 'That username or token already exists.'});
    } else {
      console.error(e);
      return ({type: 'UnknownError', message: 'An unexpected error has occured.'});
    }
  }
}

export async function createQuester(firebaseToken: string, texture: Texture) {
  if (!validateTexture(texture)) {
    return ({type: 'InvalidTextureError', message: 'Provided texture is invalid.'});
  }

  const user = await getAuth(firebaseAdmin).verifyIdToken(firebaseToken);
  if (!user.email) {
    return {type: 'AuthError', message: 'user.email is undefined.'};
  }

  try {
    const fUser = await prisma.user.findUnique({
      where: {
        userName: user.email
      },
      select: {
        id: true
      }
    });
    if (!fUser) {
      return {type: 'UserNotFoundError', message: 'User not found in database.'};
    }
      
    await prisma.quester.create({
      data: {
        name: 'Default',
        userId: fUser.id,
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
  const result = prisma.quester.findMany({take: 10});
  return result;
}

export async function getUser(userName: string) {
  const result = prisma.user.findUnique({
    where: {
      userName
    }
  });

  return result;
}

export async function updateUserProfile(firebaseToken: string, displayName: string, profile: string) {
  const user = await getAuth(firebaseAdmin).verifyIdToken(firebaseToken);
  if (!user.email) {
    return {type: 'AuthError', message: 'user.email is undefined'};
  }

  await prisma.user.update({
    where: {
      userName: user.email
    },
    data: {
      displayName,
      profile
    }
  });

  return {type: 'Success', message: 'User updated successfully.'};
}
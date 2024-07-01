'use server'

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "./prisma";

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
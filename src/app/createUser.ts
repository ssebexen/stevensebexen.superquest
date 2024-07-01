'use server'

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "./prisma";

export default async function createUser(userName: string, firebaseToken: string) {
  try {
    const user = await prisma.user.create({
      data: {
        userName,
        firebaseToken
      }
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return ({type: 'AlreadyExistsError', message: 'That username or token already exists.'});
    } else {
      return ({type: 'UnknownError', message: 'An unhandled error has occured.'});
    }
  }

  return {type: 'Success', message: ''};
}
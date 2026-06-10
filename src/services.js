import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from './firebase'

export async function createUserDocument(user, provider, fullName) {
  const userRef = doc(db, 'users', user.uid)
  const userSnapshot = await getDoc(userRef)

  if (userSnapshot.exists()) {
    return
  }

  await setDoc(userRef, {
    uid: user.uid,
    fullName: fullName || user.displayName || '',
    email: user.email,
    provider,
    createdAt: serverTimestamp(),
    onboardingCompleted: false,
  })
}

export async function signUpWithEmail({ fullName, email, password }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  await updateProfile(userCredential.user, { displayName: fullName })
  await createUserDocument(userCredential.user, 'password', fullName)

  return userCredential.user
}

export async function logInWithEmail({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  return userCredential.user
}

export async function continueWithGoogle() {
  const userCredential = await signInWithPopup(auth, googleProvider)

  await createUserDocument(userCredential.user, 'google', userCredential.user.displayName)

  return userCredential.user
}

export function logOut() {
  return signOut(auth)
}

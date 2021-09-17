import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
}

// get user from firestore where userId === userId from Auth()
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const results = await firebase.firestore().collection('users').limit(10).get();

  return results.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) => profile.userId !== userId && !following.includes(profile.userId)
    );
}

// Update the logged in user profile
export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // logged in user document id
  profileId, // user that you want to follow
  isFollowingProfile // Am i currently following this person?
) {
  await firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
}

// Update specific user profile
export async function updateFollower(profileDocId, loggedInUserId, isFollower) {
  const result = await firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollower
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId)
    });
}

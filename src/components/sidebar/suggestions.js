import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react/cjs/react.development';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';
import PropTypes from 'prop-types';

export default function Suggestions({ userId, loggedInUserDocId, following }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  console.log('profiles', profiles);

  return !profiles ? (
    <Skeleton count={5} height={44} />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-1">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array
};

import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

import Card from '@/components/Card';
import CardButton from '@/components/CardButton';
import Page from '@/components/Page';

const COMMUNITY_QUERY = gql`
  query ($id: Int!) {
    community(id: $id) {
      id
      name
      description
      icon
      members {
        id
        name
        profile_photo
      }
    }
  }
`;

const CommunityPage = () => {
  const { query } = useRouter();
  const { data, loading } = useQuery(COMMUNITY_QUERY, {
    skip: !query.id,
    variables: {
      id: Number(query.id),
    },
  })

  const community = data?.community;

  if (!community || loading) {
    return null;
  }

  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">Welcome to {community.name}</h1>
          <p>The community feed containing all the community’s posts should be shown in this section.</p>  
        </Card>
        <Card className="ml-4 py-10 max-w-xs flex-none grid justify-items-center gap-2 max-w-xs">
          <div className="text-2xl rounded-full bg-white w-14 h-14 flex items-center justify-center">
            {community.icon}
          </div>
          <h2 className="text-md font-bold">{community.name}</h2>
          <span className="text-sm text-gray-400"><strong>{community.members.length}</strong> members</span>
          <p className="text-center text-sm">{community.description}</p>
          <ul className="grid gap-4 mt-2">
            {community.members.map(({ id, name, profile_photo }) => (
              <li>
                <CardButton href={`/profile/${id}`} className="flex items-center">
                  <img className="h-6 w-6" src={profile_photo} />
                  <span className="ml-2 text-md">{name}</span>
                </CardButton>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default CommunityPage;

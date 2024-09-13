import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const getAuth0Token = async () => {
  const response = await axios.post(`https://dev-expj0zn6arlh8lt3.us.auth0.com/oauth/token`, {
    client_id: process.env.NEXT_PUBLIC_AUTH0_M2M_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_AUTH0_M2M_CLIENT_SECRET,
    audience: 'https://dev-expj0zn6arlh8lt3.us.auth0.com/api/v2/',
    grant_type: 'client_credentials',
  });

  return response.data.access_token;
};

const getUserRolesFromAuth0 = async (userId: string, token: string) => {
  const response = await axios.get(`https://dev-expj0zn6arlh8lt3.us.auth0.com/api/v2/users/${userId}/roles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const token = await getAuth0Token();
    const roles = await getUserRolesFromAuth0(userId, token);
    return NextResponse.json({ roles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user roles' }, { status: 500 });
  }
}

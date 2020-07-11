import React from "react";
import {useSession, getSession} from 'next-auth/client'
import AccessDenied from '../components/access-denied'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Layout from "../components/layout";

ProfilePage.getInitialProps = async ({ req, query }) => {
    const protocol = 'http:'
    const host = 'localhost:3000'
    const pageRequest = `${protocol}//${host}/api/profiles/profile?id=${query.id}`

    const res = await fetch(pageRequest)
    const json = await res.json()
    return json
}

function ProfilePage({ profile }) {
    const [session, loading] = useSession()

    if (!session) {
        return <AccessDenied/>
    }

    return (
        <Layout>
            <div>
                <h1>{profile.email}</h1>
                <p><b>Verified at:</b> {profile.email_verified}</p>
                <Link href="/users">
                    <a>← Back to profiles</a>
                </Link>
            </div>
        </Layout>
    )
}

export default ProfilePage

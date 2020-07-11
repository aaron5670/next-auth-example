import React from "react";
import {useSession, getSession} from 'next-auth/client'
import Layout from '../components/layout'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import AccessDenied from "../components/access-denied";

HomePage.getInitialProps = async ({req}) => {
    const protocol = 'http:'
    const host = 'localhost:3000'
    const pageRequest = `${protocol}//${host}/api/profiles/users`
    const res = await fetch(pageRequest)
    const json = await res.json()
    return json
}

function HomePage({users, page, pageCount}) {
    const [session, loading] = useSession()

    if (!session) {
        return <AccessDenied/>
    }

    return (
        <Layout>
            <ul>
                {users.map(user => (
                    <li className="profile" key={user.id}>
                        <Link href={`/profile?id=${user.id}`}>
                            <a>
                                <span>{user.email}</span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            <nav>
                {page > 1 && (
                    <Link href={`/?page=${page - 1}&limit=9`}>
                        <a>Previous</a>
                    </Link>
                )}
                {page < pageCount && (
                    <Link href={`/?page=${page + 1}&limit=9`}>
                        <a className="next">Next</a>
                    </Link>
                )}
            </nav>
        </Layout>
    )
}

export default HomePage

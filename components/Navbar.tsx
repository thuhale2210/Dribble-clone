import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AuthProviders from './AuthProviders'
import ProfileMenu from './ProfileMenu'
import { getCurrentUser } from '@/lib/session'
import { signOut } from 'next-auth/react'
import { NavLinks } from '@/constants'
import { link } from 'fs'

const Navbar = async () => {
    // log-in session
    const session = await getCurrentUser();

    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link href='/'>
                    <Image
                        src='/logo.svg'
                        width={115}
                        height={43}
                        alt='Flexibble' />
                </Link>
                <ul className='xl:flex hidden text-small gap-7'>
                    {NavLinks.map((link) => (
                        <Link href={link.href} key={link.key}>
                            {link.text}
                        </Link>
                    ))}
                </ul>
            </div>

            {/* display whether user is in a session or not */}
            <div className='flexCenter gap-4'>
                {session?.user ? (
                    <>
                        <ProfileMenu session={session} />

                        <Link href='/create-project'>
                            Share Work
                        </Link>
                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    )
}

export default Navbar
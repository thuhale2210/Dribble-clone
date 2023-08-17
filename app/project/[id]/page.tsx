import { ProjectInterface } from '@/common.types'
import Modal from '@/components/Modal'
import { getProjectDetail } from '@/lib/actions'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import Image from "next/image"
import RelatedProject from '@/components/RelatedProject'
import ProjectActions from '@/components/ProjectActions'

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser()

  const result = await getProjectDetail(id) as { project?: ProjectInterface }

  if (!result?.project) {
    <p>Failed to fetch project information</p>
  }

  const projectDetails = result?.project

  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`

  return (
    <Modal>
      <section className='flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full'>
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={projectDetails?.createdBy?.avatarUrl as string}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className='flex-1 flexStart flex-col gap-1'>
            <p className='self-start text-lg font-semibold'>{projectDetails?.title}</p>
            <div className='user-info'>
              <Link href={renderLink()}>{projectDetails?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <p className='text-primary-purple font-semibold'><Link href={renderLink()}>{projectDetails?.category}</Link></p>
            </div>
          </div>
        </div>

        { session?.user?.email === projectDetails?.createdBy?.email && (
          <div className='flex justity-end items-center gap-2'>
            <ProjectActions projectId={projectDetails?.id}/>
          </div>
        )}

      </section>

      <section className='mt-10'>
        <Image src={projectDetails?.image as string} width={1064} height={798} alt='project' />
      </section>

      <section className=' flexCenter flex-col mt-10'>
        <p className='max-w-5xl text-xl font-normal'>{projectDetails?.description}</p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link href={projectDetails?.githubUrl as string} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link href={projectDetails?.liveSiteUrl as string} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={projectDetails?.createdBy?.avatarUrl as string}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProject userId={projectDetails?.createdBy?.id  as string} projectId={projectDetails?.id as string} />
    </Modal>
  )
}

export default Project
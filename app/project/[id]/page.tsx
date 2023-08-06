import { ProjectInterface } from '@/common.types'
import Modal from '@/components/Modal'
import { getProjectDetail } from '@/lib/actions'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import Image from "next/image"

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
              src={projectDetails?.createdBy?.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>
        </div>
      </section>
    </Modal>
  )
}

export default Project
import { SessionFetchError, SessionFetchErrorCode } from '@session.js/errors'
import type { ResponseUploadAttachment } from '@/network/response'
import type { RequestUploadAttachment } from '@/network/request'

const fileServerURL = 'http://filev2.getsession.org'

export async function uploadAttachment(body: RequestUploadAttachment): Promise<ResponseUploadAttachment> {
  const request = await fetch(`${fileServerURL}/file`, {
    method: 'POST',
    body: body.data
  })
  if(request.status !== 200) {
    throw new SessionFetchError({ code: SessionFetchErrorCode.UploadFailed, message: 'Failed to upload attachment to filev2.getsession.org' })
  }
  const response = await request.json() as { id: string }
  return { id: Number(response.id), url: `${fileServerURL}/file/${response.id}` }
}
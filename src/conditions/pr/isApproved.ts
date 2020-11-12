import { reverse } from 'dns'
import { PRProps } from '.'

const TYPE = 'isApproved'

export interface ConditionisApproved {
  type: typeof TYPE
  value: boolean
  required?: number
}

const isApproved = (condition: ConditionisApproved, pr: PRProps) => {
  let reviewers: string[] = []
  pr.reviews.forEach(review => {
    if (reviewers.indexOf(review.user.login) == -1)
      reviewers.push(review.user.login)
  })
  return (
    !pr.pendingReview &&
    pr.approved >= reviewers.length &&
    (condition.required ? pr.approved >= condition.required : true)
  )
}

export default [TYPE, isApproved] as const

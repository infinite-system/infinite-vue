import { injectable } from 'inversify'
import { MessagesRepository } from './MessagesRepository'
import { use } from '@/kernel'

export abstract class GrandParent {
  grandParentProp = 1
}

@injectable()
export abstract class MessagesPresenter extends GrandParent {

  get messagesRepository() { return use(MessagesRepository) }

  nonObservedProp = 'test'

  showValidationWarning = null

  constructor () {
    super()
  }

  init () {
    this.showValidationWarning = false
    this.reset()
  }

  abstract reset (): void

  get messages () {
    return this.messagesRepository.appMessages
  }

  get clientMessages () {
    return this.messagesRepository.clientMessages
  }

  unpackRepositoryPmToVm (pm, userMessage) {
    this.showValidationWarning = !pm.success
    this.messagesRepository.appMessages = pm.success ? [userMessage] : [pm.serverMessage]
  }
}

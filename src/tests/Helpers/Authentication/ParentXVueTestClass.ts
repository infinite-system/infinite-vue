import { inject, injectable } from 'inversify'
import type { MessagesRepository } from "@/tests/Helpers/Core/Messages/MessagesRepository";

import { lazy, Inject } from '@/tests/Helpers/IOC/IOC'

@injectable()
export abstract class ParentXVueTestClass {

  @lazy(Inject.MessagesRepository) messagesRepository: MessagesRepository

  private parentPrivate = 111

  prop = 'test'

  nonReactiveProp = {
    test: {
      test: true
    }
  }

  showValidationWarning = null

  messagesObservables = {}

  // constructor() {}

  init () {
    this.showValidationWarning = false
    this.reset()
  }


  parentValue = 'Text from parent class'
  parentValueAlert () {
    alert(this.parentValue)
  }

  abstract reset (): void
}
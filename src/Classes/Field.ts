import { watch, onMounted, onUnmounted } from "vue";
import { Behavior } from "@/index";
import { use, init } from "@/kernel";
import { AppPresenter } from "@/Classes/AppPresenter";
import { RouterGateway } from "@/Classes/Routing/RouterGateway";

export class Mouse {

  x = 0
  y = 0

  init () {
    const update = (e) => this.update(e)
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))
    return this
  }

  update (event) {
    this.x = event.pageX
    this.y = event.pageY
  }
}

export class Field {

  app = use(AppPresenter)

  router = use(RouterGateway)

  static behavior: any = {
    init: Behavior.SCOPED_INTERCEPT,
    runWithIntercept: Behavior.INTERCEPT
  }

  constructor (private _prop: number, private buildMouse = true) {}

  get prop () {
    return this._prop
  }

  set prop (v) {
    this._prop = v
  }

  get email () {
    return this.app.router.userModel.email
  }

  x: number

  y: number

  update: (event) => {}

  mouse: Mouse

  init () {

    // if (this.buildMouse) {
    //
    //   // console.log('init')
    //   watch(() => this.prop, newVal => {
    //     console.log('newVal', newVal)
    //   })
    //
    //   // eslint-disable-next-line no-unexpected-multiline
    //   const mouse = init(Mouse).toRefs();
    //
    //   ({
    //     x: this.x,
    //     y: this.y,
    //   } = mouse)
    //
    // }
    // const { update, x } = mouse
    // // console.log('/**/iRefs(UseMouse)', iRefs(UseMouse).update({x:0,y:0}))
    //
    // setTimeout(() => {
    //   update({ pageX: 1000, pageY: 1000 })
    // }, 1000)

    return this
  }

  interceptableValue = 'testing'
  runWithInterceptResult = ''

  runWithIntercept (variable = '') {
    return this.interceptableValue
  }

  interceptable () {
    console.log('interceptable')
  }

  increase () {
    this._prop++
  }

  private privateFunc () {
    alert('hey')
  }
}
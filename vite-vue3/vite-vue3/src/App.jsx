import { defineComponent } from '@vue/runtime-core'
// import "@styles/index.css"
import '@styles/test.less'
import classes from '@styles/test.module.css'

import { a } from './test'
import logo from './assets/logo.png'
export default defineComponent({
  setup() {
    return () => {
      return (
        <>
          <div class={`root ${classes.moduleClass}`}>hello {a.name}</div>
          <img src={logo}></img>
          <p>haha3</p>
        </>
      )
    }
  },
})

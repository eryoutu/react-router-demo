import { Component } from "react";
import {Consumer} from './context';
import pathToRegexp from 'path-to-regexp'

export default class Route extends Component {
  render() {
    return (
      <Consumer>
        {
          value => {
            let {location: {pathname}} = value;
            let {
              path='/', 
              component:Component, render, children, 
              exact=false
            } = this.props;

            let keys = [] //[id]，动态参数名称的数组
            let regexp = pathToRegexp(path, keys, {end: exact})
            let result = pathname.match(regexp) //结果为匹配出来的动态参数的值
            let props = {
              location: value.location,
              history: value.history,
            }
            if(result) {
              let [,...values] = result;
              keys = keys.map(key => key.name)
              let params = keys.reduce((memo, name, index) => {
                memo[name] = values[index]
              })
              let match = {
                url: pathname,
                path,
                params
              }
              props.match = match;
              //渲染Route有三种方式 Component render children
              if(Component) {
                return <Component {...props}></Component>
              } else if(render) {
                return render(props)
              } else if(children) {
                return children(props)
              } else {
                return null
              }
            } else {
              if(children) {
                return children(props)
              } else {
                return null
              }
            }
          }
        }
      </Consumer>
    )
  }
}
import React,{Component} from 'react'
import { Provider} from './context'

export default class HashRouter extends Component {
  state = {
    location: {
      pathname: window.location.hash ? window.location.hash.slice(1) : '/'
    }
  };
  componentDidMount() {
    //监听hash变化，更新pathname
    window.addEventListener('hashchange', () => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash ? window.location.hash.slice(1) : '/' //hash去掉#
        }
      })
    })
  }
  render() {
    let that = this
    let value = {
      location: that.state.location,
      // history对象
      history: {
        push(to) {
          if(typeof to === 'object') {
            let {pathname, state} = to
            that.setState({ //为什么这里改一次location，hashchange中又要改一次？只是为了合并其他的state吗？
              ...that.state,
              location: {
                ...that.state.location,
                pathname,
                state
              }
            },() => {
              window.location.hash = pathname; //修改hash
            });
          } else {
            window.location.hash = to
          }
        }
      },
      goback(){
        window.history.go(-1);
      },
      forward(){
        window.history.go(1);
      },
    }
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}
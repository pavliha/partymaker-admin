import React, { Component } from 'react'
import { object, func, number, arrayOf, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import Socket from 'services/Socket'
import messageShape from 'shapes/message'
import ChatBody from './ChatBody'
import Messages from './Messages'
import ChatForm from './ChatForm'
import wait from 'src/utils/wait'

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 141px)'
  },
  titles: {
    paddingLeft: 13,
  }
}

class Chat extends Component {

  state = {
    page: 1,
    limit: 20,
    isScrollingBottom: false,
    isForceScrollingBottom: false,
    isLoading: true
  }

  async componentDidMount() {
    await this.load()
    this.forceScrollBottom()

    if (!Socket.socket) return

    Socket.on('message', this.scrollBottom)
  }

  load = async (page = 1) => {
    const { onLoad } = this.props
    const { limit } = this.state

    this.setState({ page, isLoading: true })
    const result = await onLoad({ page, limit })
    this.setState({ isLoading: false })

    return result
  }

  sendMessage = (form) => {
    const { onSend } = this.props
    const promise = onSend(form)
    this.scrollBottom()

    return promise
  }

  loadMoreMessages = () => {
    const { totalMessages } = this.props
    const { page, limit } = this.state

    if (totalMessages <= page * limit) return null

    return this.load(page + 1)
  }

  scrollBottom = () => {
    this.setState({ isScrollingBottom: true })
  }

  forceScrollBottom = () => {
    this.setState({ isForceScrollingBottom: true })
  }

  disableScrolling = async () => {
    await wait(500)
    this.setState({ isScrollingBottom: false })
  }

  disableForceScrolling = () => {
    this.setState({ isForceScrollingBottom: false })
  }

  render() {
    const { classes, messages, invite_token } = this.props
    const { isScrollingBottom, isForceScrollingBottom, isLoading } = this.state

    return (
      <div className={classes.root}>
        <ChatBody
          isScrollingBottom={isScrollingBottom}
          isForceScrollingBottom={isForceScrollingBottom}
          onScrollBottom={this.disableScrolling}
          onScrollTop={this.loadMoreMessages}
          onForceScrollBottom={this.disableForceScrolling}
        >
          <Messages isLoading={isLoading} messages={messages || []} />
        </ChatBody>
        <ChatForm invite_token={invite_token} onSubmit={this.sendMessage} />
      </div>
    )
  }
}

Chat.propTypes = {
  classes: object.isRequired,
  messages: arrayOf(messageShape).isRequired,
  totalMessages: number.isRequired,
  invite_token: string.isRequired,
  onLoad: func.isRequired,
  onSend: func.isRequired,
}

export default withStyles(styles)(Chat)
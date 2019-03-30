import * as React from "react"
import {
  ModalBackground, Modal, ModalCard,
  ModalCardHeader, ModalCardTitle,
  ModalCardBody, ModalCardFooter,
  Button, Delete
} from "bloomer"
import { deleteEventRange } from "src/api/event"

type CloseHandler = () => void

interface Props {
  start?: Date
  end?: Date
  isActive: boolean
  onEnd: CloseHandler
}

export default class extends React.Component<Props, {}> {
  static defaultProps = {
    start: new Date(),
    end: new Date()
  }

  render() {
    return (
      <Modal isActive={this.props.isActive}>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>ModalCard Title</ModalCardTitle>
            <Delete />
          </ModalCardHeader>
          <ModalCardBody>
            Do you really want to delete all events from
            {String(this.props.start)} till {String(this.props.end)}?
          </ModalCardBody>
          <ModalCardFooter>
            <Button isColor="success" onClick={() => this.close()}>No</Button>
            <Button isColor="warning" onClick={async () => await this.delete()}>Yes</Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    )
  }

  private close() {
    this.props.onEnd()
  }

  private async delete() {
    await deleteEventRange(this.props.start, this.props.end)
    this.close()
  }
}

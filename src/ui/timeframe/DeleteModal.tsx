import * as React from "react"
import {
  ModalBackground, Modal, ModalCard,
  ModalCardHeader, ModalCardTitle,
  ModalCardBody, ModalCardFooter,
  Button, Delete
} from "bloomer"

type CloseHandler = () => void

interface Props {
  start?: Date
  end?: Date
  isActive: boolean
  onEnd: CloseHandler
}

export default class extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
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
            <Button isColor="warning" onClick={() => this.close()}>Yes</Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    )
  }

  private close() {
    this.props.onEnd()
  }
}

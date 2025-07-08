import { Modal, Form, FormGroup, FormControl, Button } from 'react-bootstrap'

const ModalTemplate = (props) => {
  const { formik, texts, getSubmit, onClose, isSubmitDisabled, showInput, inputEl, colorBtn } = props

  return (
    <Modal centered show onHide={onClose} backdrop={true} keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>
          {texts.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={getSubmit}>
          {showInput
            ? (
                <FormGroup>
                  <FormControl
                    name="name"
                    id="name"
                    value={formik.values.name}
                    autoComplete="off"
                    onChange={(e) => {
                      formik.handleChange(e)
                    }}
                    required
                    data-testid="input-name"
                    ref={inputEl}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.errors.name}
                  />
                  <Form.Label className="visually-hidden" htmlFor="name">
                    {texts.textLabel}
                  </Form.Label>
                  {formik.errors.name
                    ? (
                        <FormControl.Feedback type="invalid">
                          {formik.errors.name}
                        </FormControl.Feedback>
                      )
                    : null}
                </FormGroup>
              )
            : texts.areYouSure}
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => onClose()}
              className="btn btn-secondary me-3 mt-3"
            >
              {texts.textBtnDiscard}
            </Button>
            <Button
              type="submit"
              className={`btn btn-${colorBtn} mt-3`}
              disabled={isSubmitDisabled}
            >
              {texts.textBtnConfirm}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalTemplate

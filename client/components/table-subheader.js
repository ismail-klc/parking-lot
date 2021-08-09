import { Form } from 'react-bootstrap'

export const SubHeader = ({
    filterText, onFilter, filteredBoxLabel
}) => {
    return (
        <>
            {
                filteredBoxLabel &&
                <Form.Group className="mb-3" >
                    <Form.Control
                        value={filterText}
                        onChange={onFilter}
                        type="text" placeholder={filteredBoxLabel} />
                </Form.Group>
            }
        </>
    )
}
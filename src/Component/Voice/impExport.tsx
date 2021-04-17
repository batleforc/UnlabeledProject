import React from 'react';
import { connect } from 'react-redux'
import { setImportExport } from '../../Action/showModal';
import Modal from '../Modal'
import ImportExportForm from './imprExportForm'

const ImportExportModal = ({ ShowModal, dispatch }: any) => {
  return (
    <Modal
      warn={false}
      on={ShowModal.importExport}
      exitOnEscape={true}
      title={"Import/Export d'une board"}
      activate={() => {
        dispatch(setImportExport(false))
      }}
      activateText="Exit"
      Content={ImportExportForm}
    />
  )
}

export default connect(state=>state)(ImportExportModal)
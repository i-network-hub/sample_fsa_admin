import React, { useState, useEffect } from 'react'
import './Documents.sass'

import Table from './../../components/Table'
// import Pagination from 'components/Pagination'
import Sidereveal from 'components/Sidereveal'
import Filter from './Filter'
import LogoImage from 'assets/icons/logo.png'

import { useDocuments } from 'hooks/DocumentsHook'
import { useFilters } from 'hooks/FiltersHook'
// import { usePagination } from 'hooks/PaginationHook'
import { UseDocumentContext } from 'context/DocumentContext'
import Buttons from 'components/Buttons'

const Documents = () => {
  // const [nextRef, setNextRef] = useState('')
  // const [editing, setEditing] = useState(false)
  // const [filteredDocs, setFilteredDocs] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [documentState, documentDispatch] = UseDocumentContext()
  const { getDocuments, loading } = useDocuments()
  
  const { handleFilterChange, filters, filteredData } = useFilters(documentState.profiles)

  // const nextPage = () => { documentDispatch({ type: 'NEXT_PAGE' }) }
  // const previousPage = () => { documentDispatch({ type: 'PREVIOUS_PAGE' }) }
  // const jumpPage = (pageNumber) => { documentDispatch({ type: 'JUMP_PAGE', payload: pageNumber }) }


  // const loadNext = async () => {
  //   const { documents, next } = await getNextDocuments(nextRef, 20)
  //   documentDispatch({ type: 'ADD_PROFILES', payload: documents})
  //   setNextRef(next)
  // }

  // const getDocs = async () => {
  //   const { documents, next } = await paginateProfiles(20)
  //   documentDispatch({ type: 'ADD_PROFILES', payload: documents})
  //   setNextRef(next)
  // }

  const loadDocs = async () => {
    const profiles = await getDocuments()
    documentDispatch({ type: 'ADD_PROFILES', payload: profiles })
  }

  useEffect(() => {
    if (documentState.profiles.length === 0) {
      loadDocs()
    }
    console.log('change')
  }, [filters])


  return !loading ? (
    <div className="dash-documents">
      <Table
        list={filteredData}
      />
      <div className="dash-documents-footer">
        {/* <Pagination
          onNext={nextPage}
          onPrevious={previousPage}
          onJump={jumpPage}
          pageCount={documentState.pageCount}
          currentPage={documentState.currentPage}
        /> */}
        <Buttons small primary onClick={() => setFilterOpen(true)} >Filters</Buttons>
      </div>
      <Sidereveal open={filterOpen} onClose={() => setFilterOpen(false)}>
        <Filter onChange={handleFilterChange} currentFilters={filters}/>
      </Sidereveal>
    </div>
  ) : (
    <div className="dash-documents__loader flex flex-col items-center justify-center">
      <span className="dash-documents__loader-title">Please wait, getting the profile.</span>
      <div className="loader">
        <img src={LogoImage} alt="" />
      </div>
    </div>
  )
}

export default Documents
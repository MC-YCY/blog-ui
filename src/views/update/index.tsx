import CreatePage from '../create/index.tsx'
import { useEffect, useState } from 'react'
import { getArticle } from '@/api/article.api.ts'
import { useSearchParams } from 'react-router-dom'

export default function() {
  const [info, setInfo] = useState()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    getArticle(searchParams.get('id')).then(res => {
      setInfo(res)
    })
  }, [])
  return <>
    <CreatePage info={info}></CreatePage>
  </>
}
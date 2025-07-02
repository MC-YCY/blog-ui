import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface SmartPaginationProps {
  total: number
  pageSize: number
  current: number
  onChange: (page: number) => void
  className?: string
  visiblePageCount?: number
}

const SmartPagination = React.forwardRef<HTMLDivElement, SmartPaginationProps>(
  (
    {
      total,
      pageSize = 10,
      current = 1,
      onChange,
      className,
      visiblePageCount = 5
    },
    ref
  ) => {
    const totalPages = Math.ceil(total / pageSize)
    const halfVisible = Math.floor(visiblePageCount / 2)

    const generatePageNumbers = () => {
      if (totalPages <= visiblePageCount) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      }

      let start = Math.max(current - halfVisible, 1)
      let end = Math.min(current + halfVisible, totalPages)

      if (current <= halfVisible) {
        end = visiblePageCount
      } else if (current >= totalPages - halfVisible) {
        start = totalPages - visiblePageCount + 1
      }

      const pages: (number | string)[] = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
      )

      if (start > 1) pages.unshift("...")
      if (end < totalPages) pages.push("...")

      if (start === 2) pages.unshift(1)
      if (end === totalPages - 1) pages.push(totalPages)

      if (start > 2) {
        pages.unshift(1)
        pages.splice(1, 0, "...")
      }
      if (end < totalPages - 1) {
        pages.push(totalPages)
        pages.splice(pages.length - 2, 0, "...")
      }

      return pages
    }

    const handlePageChange = (page: number) => {
      if (page < 1 || page > totalPages || page === current) return
      onChange(page)
    }

    if (totalPages <= 1) return null

    return (
      <Pagination ref={ref} className={className}>
        <PaginationContent className={'bg-background shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)]'}>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(current - 1)
              }}
              isActive={current > 1}
            />
          </PaginationItem>

          {generatePageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={page === current}
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(page as number)
                  }}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(current + 1)
              }}
              isActive={current < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
)

SmartPagination.displayName = "SmartPagination"

export { SmartPagination }
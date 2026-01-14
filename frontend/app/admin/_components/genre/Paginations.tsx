import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationsProps {
  currentPage: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
}

function Paginations({ currentPage, totalItems, limit, onPageChange }: PaginationsProps) {
  
  const totalPages = Math.ceil(totalItems / limit);

  if (totalPages <= 1) return null; 

  return (
    <div className="mt-5">
      <Pagination>
        <PaginationContent>
          {/* Badanka Previous */}
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
                scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {/* Lambarada Bogga */}
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                
                isActive={currentPage === index + 1}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(index + 1);
                  scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Badanka Next */}

          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
                scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default Paginations

import React from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ListingStatus = 'pending' | 'listed' | 'confirmed' | 'completed' | 'expired' | 'cancelled' | 'rejected';

export type Listing = {
  id: string;
  orderName: string;
  createdAt: string;
  seller: string;
  status: ListingStatus;
};

type ListingsTableProps = {
  listings: Listing[];
  onViewListing: (id: string) => void;
};

const StatusBadge = ({ status }: { status: ListingStatus }) => {
  const statusLabels: Record<ListingStatus, string> = {
    pending: 'Pending',
    listed: 'Listed',
    confirmed: 'Confirmed',
    completed: 'Completed',
    expired: 'Expired',
    cancelled: 'Cancelled',
    rejected: 'Rejected',
  };

  return (
    <span className={`status-badge ${status}`}>
      {statusLabels[status]}
    </span>
  );
};

const SortableHeader = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
    {label}
    <ArrowUpDown size={14} />
  </div>
);

const ListingsTable: React.FC<ListingsTableProps> = ({ listings, onViewListing }) => {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden animate-fadeIn">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">
                <SortableHeader label="Order Name" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">
                <SortableHeader label="Created At" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">
                Seller
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-foreground/70">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr 
                key={listing.id} 
                className="listing-table-row border-b border-border"
              >
                <td className="px-6 py-4 text-sm">{listing.orderName}</td>
                <td className="px-6 py-4 text-sm text-foreground/80">{listing.createdAt}</td>
                <td className="px-6 py-4 text-sm">{listing.seller}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={listing.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Button 
                    variant="link" 
                    className="text-primary font-medium" 
                    onClick={() => onViewListing(listing.id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between px-6 py-4 border-t border-border">
        <div className="text-sm text-foreground/70">
          Page 1
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft size={16} />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingsTable;

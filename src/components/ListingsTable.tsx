
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

  const statusClasses: Record<ListingStatus, string> = {
    pending: 'bg-[#F2FCE2] text-[#403E43] border-[#F2FCE2]',
    listed: 'bg-[#D3E4FD] text-[#403E43] border-[#D3E4FD]',
    confirmed: 'bg-[#F1F0FB] text-[#403E43] border-[#F1F0FB]',
    completed: 'bg-[#F2FCE2] text-[#403E43] border-[#F2FCE2]',
    expired: 'bg-[#F6F6F7] text-[#8A898C] border-[#F6F6F7]',
    cancelled: 'bg-[#F6F6F7] text-[#9F9EA1] border-[#F6F6F7]',
    rejected: 'bg-[#F6F6F7] text-[#9F9EA1] border-[#F6F6F7]',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
};

const SortableHeader = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1 cursor-pointer hover:text-[#403E43] text-[#8E9196] transition-colors">
    {label}
    <ArrowUpDown size={14} />
  </div>
);

const ListingsTable: React.FC<ListingsTableProps> = ({ listings, onViewListing }) => {
  return (
    <div className="bg-white rounded-lg border border-[#C8C8C9]/30 overflow-hidden animate-fadeIn shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#C8C8C9]/30 bg-[#F6F6F7]/50">
              <th className="px-6 py-4 text-left text-sm font-medium text-[#8E9196]">
                <SortableHeader label="Order Name" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#8E9196]">
                <SortableHeader label="Created At" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#8E9196]">
                Seller
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#8E9196]">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-[#8E9196]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr 
                key={listing.id} 
                className="border-b border-[#C8C8C9]/30 hover:bg-[#F6F6F7]/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-[#403E43]">{listing.orderName}</td>
                <td className="px-6 py-4 text-sm text-[#8A898C]">{listing.createdAt}</td>
                <td className="px-6 py-4 text-sm text-[#403E43]">{listing.seller}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={listing.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Button 
                    variant="link" 
                    className="text-[#403E43] font-medium hover:text-[#403E43]/80" 
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
      
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#C8C8C9]/30 bg-[#F6F6F7]/30">
        <div className="text-sm text-[#8E9196]">
          Page 1
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-[#C8C8C9] text-[#8E9196] hover:bg-[#F1F0FB] hover:text-[#403E43]"
          >
            <ChevronLeft size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-[#C8C8C9] text-[#8E9196] hover:bg-[#F1F0FB] hover:text-[#403E43]"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingsTable;

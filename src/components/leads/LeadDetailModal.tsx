import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { UserActivity, Lead, QuizSubmission, QuizAnswer, getQuizAnswersForUser } from '@/utils/leadTracking';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeadDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userActivity: UserActivity | null;
}

const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ isOpen, onClose, userActivity }) => {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [isLoadingAnswers, setIsLoadingAnswers] = useState(false);

  useEffect(() => {
    if (isOpen && userActivity?.user_id) {
      setIsLoadingAnswers(true);
      getQuizAnswersForUser(userActivity.user_id)
        .then(setQuizAnswers)
        .catch(console.error)
        .finally(() => setIsLoadingAnswers(false));
    }
  }, [isOpen, userActivity]);

  if (!userActivity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Details for: {userActivity.user_name || userActivity.user_email}</DialogTitle>
          <DialogDescription>
            User ID: {userActivity.user_id} | Joined: {new Date(userActivity.user_created_at).toLocaleDateString()}
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4" />
        </DialogHeader>
        <ScrollArea className="h-[calc(80vh-100px)] pr-6">
          <div className="py-4 space-y-6">
            {/* User Information Section */}
            <div>
              <h4 className="text-md font-semibold mb-2 text-gray-700">User Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p><strong>Name:</strong> {userActivity.user_name || "N/A"}</p>
                <p><strong>Email:</strong> {userActivity.user_email}</p>
                <p><strong>Last Activity:</strong> {userActivity.latest_lead_timestamp ? new Date(userActivity.latest_lead_timestamp).toLocaleString() : "N/A"}</p>
              </div>
            </div>

            {/* Lead Entries Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">Lead Entries ({userActivity.leads_data?.length || 0})</h3>
              {userActivity.leads_data && userActivity.leads_data.length > 0 ? (
                <div className="space-y-3">
                  {userActivity.leads_data.map((lead: Lead) => (
                    <div key={lead.id} className="p-3 border rounded-md bg-slate-50 text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-gray-800">Source: <Badge variant={lead.source === 'quiz_results' ? 'default' : 'secondary'}>{lead.source}</Badge></p>
                        <p className="text-xs text-gray-500">{new Date(lead.created_at!).toLocaleString()}</p>
                      </div>
                      <p><strong>Plan:</strong> {lead.pricing_tier || "N/A"}</p>
                      <p><strong>Status:</strong> {lead.status}</p>
                      {lead.notes && <p className="mt-1 text-xs text-gray-600"><strong>Notes:</strong> {lead.notes}</p>}
                      {lead.device_info && (
                        <p className="mt-1 text-xs text-gray-500">
                          <strong>Device:</strong> { (lead.device_info as any).userAgent} | { (lead.device_info as any).screenSize}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-gray-500">No lead entries found.</p>}
            </div>

            {/* Quiz Submissions Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">Quiz Submissions ({userActivity.quiz_submissions_data?.length || 0})</h3>
              {userActivity.quiz_submissions_data && userActivity.quiz_submissions_data.length > 0 ? (
                <div className="space-y-3">
                  {userActivity.quiz_submissions_data.map((sub: QuizSubmission) => (
                    <div key={sub.id} className="p-3 border rounded-md bg-slate-50 text-sm">
                      <p className="text-xs text-gray-500 mb-1">Submitted: {new Date(sub.submitted_at).toLocaleString()}</p>
                      <p className="font-semibold text-gray-800">Results:</p>
                      <pre className="bg-gray-100 p-2 rounded text-xs mt-1 max-h-40 overflow-y-auto">
                        {JSON.stringify(sub.quiz_results, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-gray-500">No quiz submissions found.</p>}
            </div>
            
            {/* Individual Quiz Answers Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">Individual Quiz Answers ({isLoadingAnswers ? '...': quizAnswers.length})</h3>
              {isLoadingAnswers ? <p className="text-sm text-gray-500">Loading answers...</p> : (
                quizAnswers.length > 0 ? (
                  <div className="space-y-2">
                    {quizAnswers.map(qa => (
                      <div key={qa.id} className="p-2 border rounded-md text-xs bg-slate-50">
                        <p className="text-gray-500">Answered At: {new Date(qa.created_at).toLocaleString()}</p>
                        <p><strong>Q ({qa.question_id}):</strong> {qa.answer.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-gray-500">No individual quiz answers found for this user.</p>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailModal; 
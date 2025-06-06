
import React from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuestionOption {
  id: string;
  text: string;
}

interface QuizQuestionProps {
  question: {
    id: string;
    text: string;
    type: 'single' | 'multiple';
    options: QuestionOption[];
  };
  answer: string | string[];
  onChange: (questionId: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answer,
  onChange,
  onNext,
  onBack,
  isLoading
}) => {
  const handleSingleOptionChange = (value: string) => {
    onChange(question.id, value);
  };

  const handleMultipleOptionChange = (optionId: string, checked: boolean) => {
    const currentAnswers = Array.isArray(answer) ? answer : [];
    
    if (checked) {
      onChange(question.id, [...currentAnswers, optionId]);
    } else {
      onChange(question.id, currentAnswers.filter(id => id !== optionId));
    }
  };

  return (
    <div>
      <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#5D4154] mb-6">
        {question.text}
      </h2>
      
      <div className="space-y-6 mb-8">
        {question.type === 'single' && (
          <RadioGroup
            value={answer as string}
            onValueChange={handleSingleOptionChange}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
                <RadioGroupItem id={option.id} value={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === 'multiple' && (
          <div className="space-y-3">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
                <Checkbox
                  id={option.id}
                  checked={Array.isArray(answer) && answer.includes(option.id)}
                  onCheckedChange={(checked) => 
                    handleMultipleOptionChange(option.id, checked === true)
                  }
                />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={isLoading || (question.type === 'multiple' ? false : !answer)}
          className="bg-[#5D4154] hover:bg-[#5D4154]/90 flex items-center gap-2"
        >
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;

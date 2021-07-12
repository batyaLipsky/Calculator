using System;

namespace ClassLibrary
{
    public class ExerciseDivide : Exercise
    {
        public ExerciseDivide(int firstNumber, int secondNumber) : base(firstNumber, secondNumber)
        {
            sign = ":";
            signName = "Divide";
        }
        override
        public void Calculate()
        {
            result = firstNumber / secondNumber;
        }
    }
}

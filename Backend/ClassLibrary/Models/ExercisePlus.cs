using System;

namespace ClassLibrary
{
    public class ExercisePlus : Exercise
    {
        public ExercisePlus(int firstNumber, int secondNumber) : base(firstNumber, secondNumber)
        {
            sign = "+";
            signName = "Plus";
        }
        override
        public void Calculate()
        {
            result = firstNumber + secondNumber;
        }
    }
}

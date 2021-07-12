using System;

namespace ClassLibrary
{
    public class ExerciseMinus : Exercise
    {
        public ExerciseMinus(int firstNumber, int secondNumber) : base(firstNumber, secondNumber)
        {
            sign = "-";
            signName = "Minus";
        }
        override
        public void Calculate()
        {
            result = firstNumber - secondNumber;
        }
    }
}

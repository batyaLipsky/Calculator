using System;

namespace ClassLibrary
{
    public class ExerciseMultiplie : Exercise
    {
        public ExerciseMultiplie(int firstNumber, int secondNumber) : base(firstNumber, secondNumber)
        {
            sign = "*";
            signName = "Multiplie";
        }
        override
        public void Calculate()
        {
            result = firstNumber * secondNumber;
        }
    }
}

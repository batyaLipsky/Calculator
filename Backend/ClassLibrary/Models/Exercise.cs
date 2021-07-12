using System;

namespace ClassLibrary
{
    public abstract class Exercise
    {
        public Guid ID { get; set; }
        public int firstNumber { get; set; }
        public int secondNumber { get; set; }
        public string sign { get; set; }
        public string signName { get; set; }
        public float result { get; set; }
        public DateTime creationDateTime { get; set; }
        public Exercise(int firstNumber, int secondNumber)
        {
            this.firstNumber = firstNumber;
            this.secondNumber = secondNumber;
            creationDateTime = DateTime.Now;
            ID = Guid.NewGuid();
        }
        public abstract void Calculate();
    }
}

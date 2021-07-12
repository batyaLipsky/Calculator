using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using ClassLibrary;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ExercisesController : ControllerBase
    {
        private static List<Exercise> exercisesList = new List<Exercise>();

        [HttpGet]
        public IEnumerable<Exercise> Get()
        {
            exercisesList = new List<Exercise>();
            return exercisesList;
        }

        [HttpGet]
        [Route("Plus")]
        public List<Exercise> CalculatePluse(int firstNumber, int secondNumber, string id = "")
        {
            ExercisePlus exercise = new ExercisePlus(firstNumber, secondNumber);
            if (!string.IsNullOrEmpty(id))
            {
                exercise.ID = Guid.Parse(id);
                exercisesList.RemoveAll(e => e.ID.ToString() == id);
            }
            exercise.Calculate();
            exercisesList.Add(exercise);
            return exercisesList;
        }

        [HttpGet]
        [Route("Minus")]

        public List<Exercise> CalculateMinus(int firstNumber, int secondNumber, string id = "")
        {
            ExerciseMinus exercise = new ExerciseMinus(firstNumber, secondNumber);
            if (!string.IsNullOrEmpty(id))
            {
                exercise.ID = Guid.Parse(id);
                exercisesList.RemoveAll(e => e.ID.ToString() == id);
            }
            exercise.Calculate();
            exercisesList.Add(exercise);
            return exercisesList;
        }

        [HttpGet]
        [Route("Multiplie")]
        public List<Exercise> CalculateMultiplie(int firstNumber, int secondNumber, string id = "")
        {
            ExerciseMultiplie exercise = new ExerciseMultiplie(firstNumber, secondNumber);
            if (!string.IsNullOrEmpty(id))
            {
                exercise.ID = Guid.Parse(id);
                exercisesList.RemoveAll(e => e.ID.ToString() == id);
            }
            exercise.Calculate();
            exercisesList.Add(exercise);
            return exercisesList;
        }

        [HttpGet]
        [Route("Divide")]
        public List<Exercise> CalculateDivide(int firstNumber, int secondNumber, string id = "")
        {
            if (secondNumber == 0)
            {
                return exercisesList;
            }
            ExerciseDivide exercise = new ExerciseDivide(firstNumber, secondNumber);
            if (!string.IsNullOrEmpty(id))
            {
                exercise.ID = Guid.Parse(id);
                exercisesList.RemoveAll(e => e.ID.ToString() == id);
            }
            exercisesList.Add(exercise);
            exercise.Calculate();
            return exercisesList;
        }

        [HttpPost]
        [Route("Delete/{id}")]
        public List<Exercise> Delete([FromRoute] string id)
        {
            exercisesList.RemoveAll(e => e.ID.ToString() == id);
            return exercisesList;
        }
    }
}
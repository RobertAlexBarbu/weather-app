using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Domain.Entities;
using WeatherApp.Repository.Data;
using WeatherAppAPI.DTO.Animal;

namespace WeatherAppAPI.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AnimalController : ControllerBase
{
    private readonly WeatherAppDbContext _context;

    public AnimalController(WeatherAppDbContext context)
    {
        _context = context;
    }
    
    [ProducesResponseType(typeof(IList<AnimalDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpGet]
    public async Task<ActionResult<IList<AnimalDTO>>> GetAllAsync()
    {
        var animalsDto = await _context.Animals.Select(a => new AnimalDTO()
        {
            Id = a.Id,
            Name = a.Name,
            MaxTemperature = a.MaxTemperature,
            MinTemperature = a.MinTemperature,
            MaxHumidity = a.MaxHumidity,
            MinHumidity = a.MinHumidity,
            Cloudy = a.Cloudy,
            Sunny = a.Sunny,
            Rain = a.Rain
        }).ToListAsync();
        return Ok(animalsDto);
    }

    [ProducesResponseType(typeof(AnimalDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpPost]
    public async Task<ActionResult<AnimalDTO>> CreateAsync(CreateAnimalDTO createAnimalDto)
    {
        Animal animal = new Animal()
        {
            Name = createAnimalDto.Name,
            MaxTemperature = createAnimalDto.MaxTemperature,
            MinTemperature = createAnimalDto.MinTemperature,
            MaxHumidity = createAnimalDto.MaxHumidity,
            MinHumidity = createAnimalDto.MinHumidity,
            Cloudy = createAnimalDto.Cloudy,
            Sunny = createAnimalDto.Sunny,
            Rain = createAnimalDto.Rain
        };
        await _context.Animals.AddAsync(animal);
        await _context.SaveChangesAsync();
        var animalDto = new AnimalDTO()
        {
            Id = animal.Id,
            Name = animal.Name,
            MaxTemperature = animal.MaxTemperature,
            MinTemperature = animal.MinTemperature,
            MaxHumidity = animal.MaxHumidity,
            MinHumidity = animal.MinHumidity,
            Cloudy = animal.Cloudy,
            Sunny = animal.Sunny,
            Rain = animal.Rain
        };
        return Ok(animalDto);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpDelete]
    public async Task<ActionResult> DeleteByIdAsync(int id)
    {
        var animal = await _context.Animals.FindAsync(id);

        if (animal == null)
        {
            return new NotFoundResult();
        }

        _context.Animals.Remove(animal);
        await _context.SaveChangesAsync();
        return new NoContentResult();
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpPut]
    public async Task<ActionResult<AnimalDTO>> EditByIdAsync(int id, EditAnimalDTO editAnimalDto)
    {
        var animal = await _context.Animals.FindAsync(id);

        if (animal == null)
        {
            return new NotFoundResult();
        }

        animal.Name = editAnimalDto.Name;
        animal.MaxTemperature = editAnimalDto.MaxTemperature;
        animal.MinTemperature = editAnimalDto.MinTemperature;
        animal.MaxHumidity = editAnimalDto.MaxHumidity;
        animal.MinHumidity = editAnimalDto.MinHumidity;
        animal.Cloudy = editAnimalDto.Cloudy;
        animal.Sunny = editAnimalDto.Sunny;
        animal.Rain = editAnimalDto.Rain;
        await _context.SaveChangesAsync();
        var animalDto = new AnimalDTO()
        {
            Id = animal.Id,
            Name = animal.Name,
            MaxTemperature = animal.MaxTemperature,
            MinTemperature = animal.MinTemperature,
            MaxHumidity = animal.MaxHumidity,
            MinHumidity = animal.MinHumidity,
            Cloudy = animal.Cloudy,
            Sunny = animal.Sunny,
            Rain = animal.Rain
        };
        return Ok(animalDto);
    }
} 
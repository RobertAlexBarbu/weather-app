namespace WeatherAppAPI.DTO.Animal;

public class CreateAnimalDTO
{
    public string Name { get; set; }
    public int MinTemperature { get; set; }
    public int MaxTemperature { get; set; }
    public int MinHumidity { get; set; }
    public int MaxHumidity { get; set; }
    public bool Rain { get; set; }
    public bool Sunny { get; set; }
    public bool Cloudy { get; set; }
}
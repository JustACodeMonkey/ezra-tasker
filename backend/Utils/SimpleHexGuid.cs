namespace EzraTasker.Utils;

/// <summary>
/// Utility class for generating simple hexadecimal GUIDs.
/// This is a simplified version of GUID generation, suitable for use as unique identifiers in tasks.
/// </summary>
public class SimpleHexGuid
{
  public static string GenerateHexId()
  {
    var buffer = new byte[4];
    Random.Shared.NextBytes(buffer);
    return Convert.ToHexStringLower(buffer);
  }
}
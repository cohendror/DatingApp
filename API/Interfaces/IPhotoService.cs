using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAysnc(IFormFile file);
        Task<DeletionResult> DeletePhotoAysnc(string publicId);
    }
}
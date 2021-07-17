using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.JSInterop;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace BlazorPlot
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddSingleton<BabylonEngine>();

            await builder.Build().RunAsync();
        }
    }

    public class BabylonEngine
    {
        private readonly IJSRuntime _js;

        public BabylonEngine(IJSRuntime js)
        {
            _js = js;
        }

        public ValueTask Initialize(string canvasId)
        {
            return _js.InvokeVoidAsync("BabylonInteropInstance.init", canvasId);
        }

        public ValueTask DrawAxis(int length)
        {
            return _js.InvokeVoidAsync("BabylonInteropInstance.drawAxis", length);
        }

        public ValueTask DrawSampleCurve()
        {
            return _js.InvokeVoidAsync("BabylonInteropInstance.drawSampleCurve");
        }
    }
}

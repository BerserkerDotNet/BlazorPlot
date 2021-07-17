"use strict";
var BabylonInterop = /** @class */ (function () {
    function BabylonInterop() {
    }
    BabylonInterop.prototype.init = function (canvasId) {
        var _this = this;
        var canvas = document.getElementById(canvasId);
        var engine = new BABYLON.Engine(canvas, true);
        this.scene = this.createScene(engine, canvas);
        engine.runRenderLoop(function () { return _this.scene.render(); });
        window.addEventListener("resize", function () { return engine.resize(); });
    };
    BabylonInterop.prototype.drawAxis = function (length) {
        if (this.axisBox) {
            this.axisBox.dispose();
            this.scene.removeMesh(this.axisBox);
            this.axisBox = undefined;
        }
        this.axisBox = BABYLON.Mesh.CreateBox("Axis", 0, this.scene);
        this.axisBox.isVisible = false;
        var red = new BABYLON.Color4(1, 0, 0);
        var xAxis = BABYLON.MeshBuilder.CreateLines("X_axis", {
            points: [new BABYLON.Vector3(-length, 0, 0), new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(length, 0, 0)],
            colors: [red, red, red]
        }, this.scene);
        var green = new BABYLON.Color4(0, 1, 0);
        var yAxis = BABYLON.MeshBuilder.CreateLines("Y_axis", {
            points: [new BABYLON.Vector3(0, -length, 0), new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, length, 0)],
            colors: [green, green, green]
        }, this.scene);
        var blue = new BABYLON.Color4(0, 0, 1);
        var zAxis = BABYLON.MeshBuilder.CreateLines("Z_axis", {
            points: [new BABYLON.Vector3(0, 0, -length), new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, length)],
            colors: [blue, blue, blue]
        }, this.scene);
        var xAxisArrow = BABYLON.MeshBuilder.CreateCylinder("X_arrow", {
            diameterBottom: 1,
            diameterTop: 0.01,
            height: 2,
            faceColors: [red, red]
        }, this.scene);
        xAxisArrow.rotate(new BABYLON.Vector3(0, 0, 1), -1.5);
        xAxisArrow.position.x = length;
        var yAxisArrow = BABYLON.MeshBuilder.CreateCylinder("Y_arrow", {
            diameterBottom: 1,
            diameterTop: 0.01,
            height: 2,
            faceColors: [green, green]
        }, this.scene);
        yAxisArrow.position.y = length;
        var zAxisArrow = BABYLON.MeshBuilder.CreateCylinder("Z_arrow", {
            diameterBottom: 1,
            diameterTop: 0.01,
            height: 2,
            faceColors: [blue, blue]
        }, this.scene);
        zAxisArrow.rotate(new BABYLON.Vector3(1, 0, 0), 1.5);
        zAxisArrow.position.z = length;
        xAxis.parent = yAxis.parent = zAxis.parent = xAxisArrow.parent = yAxisArrow.parent = zAxisArrow.parent = this.axisBox;
    };
    BabylonInterop.prototype.drawSampleCurve = function () {
        var points = [];
        var colors = [];
        var lineColor = new BABYLON.Color4(0.5, 0.3, 0);
        for (var i = 0; i < 10; i += 0.01) {
            points.push(new BABYLON.Vector3(Math.pow(Math.E, -0.5 * i) * Math.cos(10 * i), 2 * i, Math.pow(Math.E, -0.5 * i) * Math.sin(10 * i)));
            colors.push(lineColor);
        }
        var path3d = new BABYLON.Path3D(points);
        var curve = path3d.getCurve();
        BABYLON.MeshBuilder.CreateLines('curve', { points: curve, colors: colors }, this.scene);
    };
    BabylonInterop.prototype.createScene = function (engine, canvas) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(1, 1, 1);
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);
        new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
        return scene;
    };
    return BabylonInterop;
}());
var BabylonInteropInstance = new BabylonInterop();

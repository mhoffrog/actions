"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnSync = void 0;
const fs = __importStar(require("fs"));
const core = __importStar(require("@actions/core"));
const child_process = __importStar(require("child_process"));
class SpawnSync {
    constructor(cwd) {
        this.cwd = cwd;
    }
    call(cmd, args = [], opts = {}) {
        var _a, _b, _c;
        const [command, arg0] = this.overrideCommand(cmd);
        const cwd = this.getCwd(opts.cwd);
        const stdin = (_a = opts.stdin) !== null && _a !== void 0 ? _a : 'inherit';
        const stdout = (_b = opts.stdout) !== null && _b !== void 0 ? _b : 'inherit';
        const stderr = (_c = opts.stderr) !== null && _c !== void 0 ? _c : 'inherit';
        const stdio = [stdin, stdout, stderr];
        const env = Object.assign(Object.assign({}, opts.env), process.env);
        if (arg0) {
            args.unshift(arg0);
        }
        const options = {
            cwd: cwd,
            input: opts.input,
            stdio: stdio,
            env: env,
            encoding: 'utf8',
        };
        const buffer = child_process.spawnSync(command, args, options);
        if (buffer.status !== 0) {
            core.setFailed(`Failed to execute command! For more details see above! \ncommand: ${command} \nargs: ${args.join(', ')}`);
        }
        return buffer;
    }
    overrideCommand(command) {
        const targets = ['node', 'yarn', 'npm', 'npx'];
        if (!targets.includes(command)) {
            return [command, undefined];
        }
        return [process.execPath, this.which(command)];
    }
    which(command) {
        return this.call('which', [command], { stdout: 'pipe' }).stdout.trim();
    }
    getCwd(override) {
        if (override) {
            if (!fs.existsSync(override)) {
                core.setFailed(`cwd does not exist: \n${override}`);
            }
            return override;
        }
        if (!fs.existsSync(this.cwd)) {
            return __dirname;
        }
        return this.cwd;
    }
}
exports.SpawnSync = SpawnSync;

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

class FFmpegService {
  private ffmpeg: FFmpeg | null = null;
  private loaded = false;

  async load() {
    if (this.loaded) return;

    this.ffmpeg = new FFmpeg();
    await this.ffmpeg.load();
    this.loaded = true;
  }

  async trimVideo(inputFile: File, startTime: number, duration: number): Promise<Blob> {
    if (!this.ffmpeg) await this.load();

    const inputName = 'input.mp4';
    const outputName = 'output.mp4';

    await this.ffmpeg!.writeFile(inputName, await fetchFile(inputFile));

    await this.ffmpeg!.exec([
      '-i', inputName,
      '-ss', startTime.toString(),
      '-t', duration.toString(),
      '-c', 'copy',
      outputName
    ]);

    const data = await this.ffmpeg!.readFile(outputName);
    return new Blob([data], { type: 'video/mp4' });
  }

  async addCaptions(
    videoFile: File, 
    srtContent: string,
    style: { fontSize?: number; color?: string; position?: string } = {}
  ): Promise<Blob> {
    if (!this.ffmpeg) await this.load();

    const inputName = 'input.mp4';
    const subtitleName = 'subtitles.srt';
    const outputName = 'output.mp4';

    await this.ffmpeg!.writeFile(inputName, await fetchFile(videoFile));
    await this.ffmpeg!.writeFile(subtitleName, srtContent);

    const fontSize = style.fontSize || 24;
    const color = style.color || 'white';

    await this.ffmpeg!.exec([
      '-i', inputName,
      '-vf', `subtitles=${subtitleName}:force_style='FontSize=${fontSize},PrimaryColour=&H00FFFFFF'`,
      '-c:a', 'copy',
      outputName
    ]);

    const data = await this.ffmpeg!.readFile(outputName);
    return new Blob([data], { type: 'video/mp4' });
  }

  async compressVideo(inputFile: File, quality: 'low' | 'medium' | 'high' = 'medium'): Promise<Blob> {
    if (!this.ffmpeg) await this.load();

    const crf = quality === 'low' ? '28' : quality === 'medium' ? '23' : '18';
    const preset = quality === 'low' ? 'superfast' : quality === 'medium' ? 'fast' : 'medium';

    const inputName = 'input.mp4';
    const outputName = 'output.mp4';

    await this.ffmpeg!.writeFile(inputName, await fetchFile(inputFile));

    await this.ffmpeg!.exec([
      '-i', inputName,
      '-c:v', 'libx264',
      '-crf', crf,
      '-preset', preset,
      '-c:a', 'aac',
      '-b:a', '128k',
      outputName
    ]);

    const data = await this.ffmpeg!.readFile(outputName);
    return new Blob([data], { type: 'video/mp4' });
  }

  async extractThumbnail(videoFile: File, timeInSeconds: number = 0): Promise<Blob> {
    if (!this.ffmpeg) await this.load();

    const inputName = 'input.mp4';
    const outputName = 'thumbnail.jpg';

    await this.ffmpeg!.writeFile(inputName, await fetchFile(videoFile));

    await this.ffmpeg!.exec([
      '-i', inputName,
      '-ss', timeInSeconds.toString(),
      '-vframes', '1',
      '-q:v', '2',
      outputName
    ]);

    const data = await this.ffmpeg!.readFile(outputName);
    return new Blob([data], { type: 'image/jpeg' });
  }
}

export const ffmpegService = new FFmpegService();
export default ffmpegService;

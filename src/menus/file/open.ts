import { fileOpen } from 'browser-fs-access';
import { loadFileAndAdjustCanvas } from '../../helpers/load-file-and-adjust-canvas';
import { updateDocumentContext } from '../../helpers/update-document-context';
import type { MenuAction } from '../../models/menu-action';
import type { DrawingContext } from '../../models/drawing-context';
import type { FileSystemHandle } from 'browser-fs-access';

export class OpenAction implements MenuAction {
  async execute(drawingContext: DrawingContext): Promise<void> {
    const file = await fileOpen({
      extensions: ['.png'],
      description: 'PNG Files',
    });
    updateDocumentContext(
      file.handle as unknown as FileSystemHandle,
      file.name,
      drawingContext,
    );

    await loadFileAndAdjustCanvas(file, drawingContext);
  }
}

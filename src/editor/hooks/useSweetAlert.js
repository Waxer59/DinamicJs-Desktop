import Swal from 'sweetalert2';
import {
  DEFAULT_SETTINGS,
  DEFAULT_SNIPPETS
} from '../../constants/editorSettingsConstants';
import { LOCALSTORAGE_ITEMS } from '../../constants/localStorageItemsConstants';
import { SWAL2_ICONS } from '../../constants/sweetAlertIconsConstants';
import { useCodeStore } from './useCodeStore';
import { useLocalStorage } from './useLocalStorage';
import { useBase64 } from './useBase64';
import { useSettingsStore } from './useSettingsStore';

const customClass = {
  popup: 'alerts',
  validationMessage: 'alerts'
};

const Toast = Swal.mixin({
  toast: true,
  customClass,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false
});

export const useSweetAlert = () => {
  const {
    onAddCodeSaved,
    onRemoveCodeSaved,
    activeCode,
    onCheckNameAndCode,
    onRenameCodeSaved,
    onGetCodeSavedByName,
    onSetUploadedCode
  } = useCodeStore();
  const { removeLocalStorageItem } = useLocalStorage();
  const {
    onSetSnippets,
    onSetSettings,
    onAddNewSnippet,
    onRemoveSnippet,
    onGetSnippetByLabel,
    onEditSnippet
  } = useSettingsStore();
  const { encodeBase64 } = useBase64();

  const throwToast = (icon, title) => {
    Toast.fire({
      heightAuto: false,
      icon,
      title
    });
  };

  const throwTextAlert = async (
    { title, inputLabel, icon },
    validInput = ''
  ) => {
    const { value } = await throwModal({
      title,
      customClass,
      icon,
      heightAuto: false,
      input: 'text',
      inputLabel,
      showCloseButton: true,
      showLoaderOnConfirm: false,
      showCancelButton: true,
      inputValidator: (value) => {
        if (validInput && validInput !== value) {
          return 'Write the name correctly!';
        }
        if (value.trim().length <= 0) {
          return 'You need to write something!';
        }
      }
    });

    return value;
  };

  const throwConfig = async ({
    fontLigatures,
    minimap,
    fontSize,
    lineNumbers,
    theme,
    mouseWheelZoom,
    snippets = []
  }) => {
    const { value } = await throwModal(
      {
        title: 'Configuration',
        customClass,
        heightAuto: false,
        html: `
        <div class="config">
          <div class="config__item">
            <label for="config__theme">Theme</label>
            <select id="config__theme">
              <option value="dark">Dark</option>
              <option value="light" ${
                theme === 'vs' ? 'selected="selected"' : ''
              }>Light</option>  
            </select>
          </div>
          <div class="config__item">
            <label for="config__lineNumbers">Line numbers</label>
            <select id="config__lineNumbers">  
              <option value="off">Off</option>
              <option value="on" ${
                lineNumbers === 'on' ? 'selected="selected"' : ''
              }>On</option>
              <option value="relative" ${
                lineNumbers === 'relative' ? 'selected="selected"' : ''
              }>Relative</option>
              <option value="interval" ${
                lineNumbers === 'interval' ? 'selected="selected"' : ''
              }>Interval</option>
            </select>
          </div>
          <div class="config__item">
            <label for="config__fontLigatures">Font ligatures</label>
            <input type="checkbox" id="config__fontLigatures" name="fontLigatures" ${
              fontLigatures ? 'checked' : ''
            }>
          </div>
          <div class="config__item">
            <label for="config__mouseWheelZoom">Mouse wheel zoom</label>
            <input type="checkbox" id="config__mouseWheelZoom" name="mouseWheelZoom" ${
              mouseWheelZoom ? 'checked' : ''
            }>
          </div>
          <div class="config__item">
            <label for="config__minimap">Minimap</label>
            <input type="checkbox" id="config__minimap" name="minimap" ${
              minimap.enabled ? 'checked' : ''
            }>
          </div>
          <div class="config__item">
            <label for="config__fontSize">Font size</label>
            <input id="config__fontSize" type="number" min="1" max="100" value="${fontSize}">
          </div>
          <div class="config__item">
            <button class="config-btn" id="config__snippets">Config snippets</button>
          </div>
        </div>
          `,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: 'Reset',
        showDenyButton: true,
        didOpen: () => {
          const snippetsBtn = document.querySelector('#config__snippets');
          snippetsBtn.addEventListener('click', async () => {
            throwSnippetsSettings(snippets);
          });
        },
        preConfirm: () => {
          const theme =
            document.getElementById('config__theme').value === 'dark'
              ? 'vs-dark'
              : 'vs';
          const lineNumbers = document.getElementById(
            'config__lineNumbers'
          ).value;
          const fontLigatures = document.getElementById(
            'config__fontLigatures'
          ).checked;

          const minimap = document.getElementById('config__minimap').checked;
          const fontSize = document.getElementById('config__fontSize').value;
          const mouseWheelZoom = document.getElementById(
            'config__mouseWheelZoom'
          ).checked;
          return {
            theme,
            lineNumbers,
            fontLigatures,
            minimap: {
              enabled: minimap
            },
            fontSize,
            mouseWheelZoom
          };
        }
      },
      async (result) => {
        if (result.isDenied) {
          await throwModal(
            {
              title: 'Are you sure?',
              customClass,
              heightAuto: false,
              icon: SWAL2_ICONS.WARNING,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, reset it!'
            },
            (result) => {
              if (result.isConfirmed) {
                Swal.close();
                removeLocalStorageItem(LOCALSTORAGE_ITEMS.SETTINGS);
                removeLocalStorageItem(LOCALSTORAGE_ITEMS.SNIPPETS_SAVED);
                onSetSettings(DEFAULT_SETTINGS);
                onSetSnippets(DEFAULT_SNIPPETS);
                throwToast(SWAL2_ICONS.SUCCESS, 'Settings reseted');
              }
              return result;
            }
          );
        }
        return result;
      }
    );
    return value;
  };

  const throwSnippetsSettings = async (snippets = []) => {
    let htmlSavesList = '';
    snippets.forEach((snippet, index) => {
      htmlSavesList += `
          <li>
            <button class="save-item__name" title="${snippet.label}" id="code-btn" data-name="${snippet.label}">${snippet.label}</button>
            <div class="save-item__actions">
            <button class="save-item__btn edit-btn" id="snippet-item__btn-${index}" data-name="${snippet.label}" title="Edit snippet" ><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="save-item__btn delete-btn" id="snippet-item__btn-${index}" data-name="${snippet.label}" title="Delete snippet" ><i class="fa-solid fa-trash"></i></button>
            </div>
          </li>`;
    });

    await throwModal(
      {
        title: 'Custom snippets',
        customClass,
        heightAuto: false,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        denyButtonText: 'Reset',
        showDenyButton: true,
        html: `
            <div class="config">
              <div class="config__item">
              <button class="save-btn" id="newSnippet-btn">New snippet</button>
              </div>
              <div class="config__item">
              <ul class="items-saved">
                ${htmlSavesList}
              </ul>
              </div>
            </div>`,
        didOpen: async () => {
          const newSnippetBtn = document.getElementById('newSnippet-btn');
          const editBtns = document.querySelectorAll('.edit-btn');
          const deleteBtns = document.querySelectorAll('.delete-btn');

          editBtns.forEach((btn) => {
            btn.addEventListener('click', async () => {
              const snippetLabel = btn.getAttribute('data-name');

              const { label, insertText, documentation } =
                onGetSnippetByLabel(snippetLabel);

              await throwModal(
                {
                  title: 'Edit Snippet',
                  html: `<input id="snippet-label" type="text" class="swal2-input" value="${label}" placeholder="Label">
                         <input id="snippet-documentation" class="swal2-input" value="${documentation}" type="text" placeholder="Documentation">
                         <textarea id="snippet-insertText" class="swal2-textarea" placeholder="Insert text">${insertText}</textarea>`,
                  customClass,
                  heightAuto: false,
                  showCloseButton: true,
                  showLoaderOnConfirm: false,
                  showCancelButton: true,
                  confirmButtonText: 'Save',
                  preConfirm: () => {
                    const labelValue =
                      document.querySelector('#snippet-label').value;
                    const documentationValue = document.querySelector(
                      '#snippet-documentation'
                    ).value;
                    const insertTextValue = document.querySelector(
                      '#snippet-insertText'
                    ).value;

                    if (
                      ![labelValue, documentationValue, insertTextValue].every(
                        (el) => el.trim().length > 0
                      )
                    ) {
                      Swal.showValidationMessage('Please fill in all fields');
                    }
                  }
                },
                (result) => {
                  if (result.isConfirmed) {
                    const label =
                      document.querySelector('#snippet-label').value;
                    const documentation = document.querySelector(
                      '#snippet-documentation'
                    ).value;
                    const insertText = document.querySelector(
                      '#snippet-insertText'
                    ).value;
                    onEditSnippet({
                      snippetToChangeLabel: snippetLabel,
                      label,
                      documentation,
                      insertText
                    });
                    throwToast(SWAL2_ICONS.SUCCESS, 'Snippet Edited!');
                  }
                }
              );
            });
          });

          deleteBtns.forEach((btn) => {
            btn.addEventListener('click', async () => {
              const snippetLabel = btn.getAttribute('data-name');
              const confirmSnippetLabel = await throwTextAlert(
                {
                  title: 'Deleting',
                  inputLabel: `You are deleting "${snippetLabel}" type the name to confirm`,
                  icon: SWAL2_ICONS.WARNING
                },
                snippetLabel
              );
              if (confirmSnippetLabel) {
                onRemoveSnippet(snippetLabel);
                throwToast(SWAL2_ICONS.SUCCESS, 'Deleted');
              }
            });
          });

          newSnippetBtn.addEventListener('click', async () => {
            await throwModal(
              {
                title: 'New Snippet',
                html: `<input id="snippet-label" type="text" class="swal2-input" placeholder="Label">
                       <input id="snippet-documentation" class="swal2-input" type="text" placeholder="Documentation">
                       <textarea id="snippet-insertText" class="swal2-textarea" placeholder="Insert text"></textarea>`,
                customClass,
                heightAuto: false,
                showCloseButton: true,
                showLoaderOnConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Save',
                preConfirm: () => {
                  const labelValue =
                    document.querySelector('#snippet-label').value;
                  const documentationValue = document.querySelector(
                    '#snippet-documentation'
                  ).value;
                  const insertTextValue = document.querySelector(
                    '#snippet-insertText'
                  ).value;

                  if (
                    ![labelValue, documentationValue, insertTextValue].every(
                      (el) => el.trim().length > 0
                    )
                  ) {
                    Swal.showValidationMessage('Please fill in all fields');
                  }
                }
              },
              (result) => {
                if (result.isConfirmed) {
                  const labelValue =
                    document.querySelector('#snippet-label').value;
                  const documentationValue = document.querySelector(
                    '#snippet-documentation'
                  ).value;
                  const insertTextValue = document.querySelector(
                    '#snippet-insertText'
                  ).value;
                  onAddNewSnippet(
                    labelValue,
                    documentationValue,
                    insertTextValue
                  );
                  throwToast(SWAL2_ICONS.SUCCESS, 'Snippet Saved!');
                }
              }
            );
          });
        }
      },
      async (result) => {
        if (result.isDenied) {
          await throwModal(
            {
              title: 'Are you sure?',
              customClass,
              heightAuto: false,
              icon: SWAL2_ICONS.WARNING,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, reset it!'
            },
            (result) => {
              if (result.isConfirmed) {
                Swal.close();
                removeLocalStorageItem(LOCALSTORAGE_ITEMS.SNIPPETS_SAVED);
                onSetSnippets(DEFAULT_SNIPPETS);
                throwToast(SWAL2_ICONS.SUCCESS, 'Snippets reseted');
              }
              return result;
            }
          );
        }
        return result;
      }
    );
  };

  const throwLocalSaves = async (saves = []) => {
    let htmlSavesList = '';
    saves.forEach((save, index) => {
      htmlSavesList += `
      <li>
        <button class="save-item__name code-btn" title="${save.name}" data-name="${save.name}">${save.name}</button>
        <div class="save-item__actions">
        <button class="save-item__btn overwrite-btn" id="save-item__btn-${index}" data-name="${save.name}" title="Overwrite" ><i class="fa-solid fa-floppy-disk"></i></button>
        <button class="save-item__btn edit-btn" id="save-item__btn-${index}" data-name="${save.name}" title="Edit name" ><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="save-item__btn delete-btn" id="save-item__btn-${index}" data-name="${save.name}" title="Delete code" ><i class="fa-solid fa-trash"></i></button>
        </div>
      </li>
      `;
    });

    await throwModal({
      title: 'Local saves',
      customClass,
      heightAuto: false,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      html: `
        <div class="config">
          <div class="config__item">
          <button class="save-btn" id="save-btn">Save this file</button>
          </div>
          <div class="config__item">
          <ul class="items-saved">
            ${htmlSavesList}
          </ul>
          </div>
        </div>
          `,
      didOpen: async () => {
        const saveBtn = document.getElementById('save-btn');
        const editBtns = document.querySelectorAll('.edit-btn');
        const deleteBtns = document.querySelectorAll('.delete-btn');
        const overwriteBtns = document.querySelectorAll('.overwrite-btn');
        const codeBtns = document.querySelectorAll('.code-btn');

        overwriteBtns.forEach((btn) => {
          btn.addEventListener('click', async () => {
            const saveName = btn.getAttribute('data-name');
            const overwritedSaveName = await throwTextAlert(
              {
                title: 'Overwriting',
                inputLabel: `You are overwriting "${saveName}"`,
                icon: SWAL2_ICONS.WARNING
              },
              saveName
            );
            if (overwritedSaveName) {
              onAddCodeSaved(overwritedSaveName);
              throwToast(SWAL2_ICONS.SUCCESS, 'Saved');
            }
          });
        });

        editBtns.forEach((btn) => {
          btn.addEventListener('click', async () => {
            const saveName = btn.getAttribute('data-name');
            const SaveNewName = await throwTextAlert({
              title: 'Editing',
              inputLabel: `You are editing "${saveName}"`,
              icon: SWAL2_ICONS.WARNING
            });
            if (SaveNewName) {
              onRenameCodeSaved(btn.getAttribute('data-name'), SaveNewName);
              throwToast(SWAL2_ICONS.SUCCESS, 'Saved');
            }
          });
        });

        deleteBtns.forEach((btn) => {
          btn.addEventListener('click', async () => {
            const saveName = btn.getAttribute('data-name');
            const confirmSaveName = await throwTextAlert({
              title: 'Deleting',
              inputLabel: `You are deleting "${saveName}" type the name to confirm`,
              icon: SWAL2_ICONS.WARNING
            });
            if (confirmSaveName) {
              onRemoveCodeSaved(confirmSaveName);
              throwToast(SWAL2_ICONS.SUCCESS, 'Deleted');
            }
          });
        });

        saveBtn.addEventListener('click', async () => {
          const saveName = await throwTextAlert({
            title: 'Name the code',
            inputLabel: 'This code will be saved locally',
            icon: SWAL2_ICONS.INFO
          });
          if (onCheckNameAndCode(saveName)) {
            throwToast(SWAL2_ICONS.ERROR, 'This name already exists');
            return;
          }
          if (saveName) {
            onAddCodeSaved(saveName, encodeBase64(activeCode));
            throwToast(SWAL2_ICONS.SUCCESS, 'Saved');
          }
        });

        codeBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            const code = onGetCodeSavedByName(btn.getAttribute('data-name'));
            if (code) {
              onSetUploadedCode(code);
              throwToast(SWAL2_ICONS.SUCCESS, 'Loaded');
              return;
            }
            if (code === '') {
              throwToast(SWAL2_ICONS.INFO, 'Empty code');
              return;
            }
            throwToast(SWAL2_ICONS.ERROR, 'Canceled');
          });
        });
      }
    });
  };

  const throwModal = async (config = {}, thenFc = (result) => result) => {
    const modal = await Swal.fire(config).then(thenFc);
    return modal;
  };

  return {
    throwToast,
    throwTextAlert,
    throwConfig,
    throwLocalSaves
  };
};

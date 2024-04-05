export interface IFile {
    file_code: string;
    file_name: string;
    file_ext: string;
    file_size: number;
    file_datetime0: number;
    download_url: string;
    line_number?: number;
}

export interface IFileLocal {
    file_name: string;
    file_ext: string;
    file_size: number;
    last_modified?: number;
    data?: File;
}

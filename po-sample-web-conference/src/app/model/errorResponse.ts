export interface ErrorResponse {
  /**
   * Error code.
   */
  code: string;
  /**
   * Error message.
   */
  message: string;
  /**
   * Message detail.
   */
  detailedMessage: string;
  /**
   * Help URL.
   */
  helpUrl?: string;
  /**
   * Details.
   */
  details?: string;
}

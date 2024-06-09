export enum KeyPrefixType {
  /**
   * Used for keys which have the blinding update and aren't using blinding
   */
  unblinded = '00',
  /**
   * Used for identified users, open groups, etc
   */
  standard = '05',
  /**
   * used for participants in open groups (legacy blinding logic)
   */
  blinded15 = '15',

  /**
   * used for participants in open groups (new blinding logic)
   */
  blinded25 = '25',

  /**
   * used for participants in open groups
   */
  groupV3 = '03',
}